# クライアントがトークンを保持し、毎回 Authorization: Bearer ... で送信（状態なし）
# サーバー側にログイン状態を保持（状態あり）しないので、session を使わない

class AuthService
  # 環境変数から直接取得
  # 本番環境：Rails.application.credentials.secret_key_base
  SECRET_KEY = ENV['JWT_SECRET']
  
  # JWTの有効期限（24時間）
  EXPIRATION_TIME = 24.hours.from_now

  # JWTトークンを生成
  # @param user_id [Integer] ユーザーID
  # @return [String] JWTトークン
  def self.encode(user_id)
    payload = {
      user_id: user_id,
      exp: EXPIRATION_TIME.to_i  # エクスポート時刻（UNIX時刻）
    }
    
    # JWTライブラリを使って署名付きトークンを生成
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  # JWTトークンをデコード（検証）
  # @param token [String] JWTトークン
  # @return [Hash, nil] デコード結果（失敗時はnil）
  def self.decode(token)
    # トークンを検証してデコード
    decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' })
    
    # デコード結果の最初の要素がペイロード
    HashWithIndifferentAccess.new(decoded[0])
  rescue JWT::DecodeError => e
    # トークンが無効な場合（改ざん、期限切れなど）
    Rails.logger.error "JWT Decode Error: #{e.message}"
    nil
  end

  # Authorizationヘッダーからトークンを抽出
  # @param headers [Hash] リクエストヘッダー
  # @return [String, nil] トークン（ヘッダーがない場合はnil）
  # この処理は stateless（状態非依存）
  def self.extract_token(headers)
    # Authorization: Bearer <token> の形式から<token>を抽出
    auth_header = headers['Authorization']
    return nil unless auth_header

    # "Bearer "の部分を除去
    auth_header.split(' ').last if auth_header.start_with?('Bearer ')
  end
end
