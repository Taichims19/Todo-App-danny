import { useState, useEffect } from "react";

type FormState<T> = {
  [key in keyof T]: any;
};

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type FormValidations<T> = {
  [K in keyof T]?: [(value: T[K]) => boolean, string];
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

type UseFormReturn<T> = {
  [K in keyof T]: T[K];
} & {
  formState: FormState<T>;
  onInputChange: (event: InputChangeEvent) => void;
  onResetForm: () => void;
  isFormValid: boolean;
} & {
  [K in keyof T as `${Extract<K, string | number>}Valid`]?: string;
};

export const useForm = <T extends FormState<T>>(
  initialForm: T,
  formValidations: FormValidations<T> = {} // Proporciona un valor predeterminado vacío
): UseFormReturn<T> => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formErrors, setFormErrors] = useState<FormErrors<T>>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  useEffect(() => {
    validateForm();
  }, [formState]);

  const onInputChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    } as T);
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const validateForm = () => {
    const errors: FormErrors<T> = {};
    let valid = true;

    for (const [key, [validateFn, errorMessage]] of Object.entries(
      formValidations
    )) {
      if (validateFn) {
        const value = formState[key as keyof T];
        if (!validateFn(value)) {
          errors[key as keyof T] = errorMessage;
          valid = false;
        }
      }
    }

    setFormErrors(errors);
    setIsFormValid(valid);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
    ...Object.fromEntries(
      Object.keys(formValidations).map((key) => [
        `${key}Valid`,
        formErrors[key as keyof T] || "",
      ])
    ),
  } as UseFormReturn<T>;
};
