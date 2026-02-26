import { FC } from "react";
import { NavLink } from "react-router";
import { Controller } from "react-hook-form";
import { NAV_ITEMS } from "../../../constants/navigation";
import { InputFormValidation } from "../../molecules";
import { CommonButton } from "../../atoms";
import { useLoginTemplate } from "./useLoginTemplate";
import styles from "./style.module.css";

export const LoginTemplate: FC = () => {
  const { control, errors, handleLoginSubmit } = useLoginTemplate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <div className={styles.area}>
          <Controller
            name="email"
            render={({ field }) => (
              <InputFormValidation
                type="email"
                placeholder="email"
                inputValue={field.value ?? ""}
                handleChangeValue={field.onChange}
                errorMessage={errors.email?.message}
                // {...field} // props名が一致せずエラー
              />
            )}
            control={control}
          />
        </div>
        <div className={styles.area}>
          <Controller
            name="password"
            render={({ field }) => (
              <InputFormValidation
                type="password"
                placeholder="password"
                inputValue={field.value ?? ""}
                handleChangeValue={field.onChange}
                errorMessage={errors.password?.message}
              />
            )}
            control={control}
          />
        </div>
        <div className={styles.area}>
          <CommonButton type="submit">ログイン</CommonButton>
        </div>
        <div className={styles.link}>
          <NavLink to={NAV_ITEMS.SIGNUP}>&lt;&lt; 新規登録はこちら</NavLink>
        </div>
      </form>
    </div>
  );
};
