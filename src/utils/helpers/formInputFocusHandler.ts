export const inputFocusHandler = () => {
  const inputs = document.querySelectorAll("input") || [];
  const textareas = document.querySelectorAll("textarea") || [];
  const arrInputs = Array.from(inputs);
  const arrTextareas = Array.from(textareas);
  const arr = [...arrInputs, ...arrTextareas];
  arr.reverse();
  arr.forEach((el) => {
    setTimeout(() => {
      el.focus({
        preventScroll: true,
      });
    }, 1);
    setTimeout(() => {
      el.blur();
    }, 2);
  });
  setTimeout(() => {
      const errors = document.querySelectorAll(".ant-form-item-has-error")
      if (errors && errors[0]) {
          const element = errors[0].parentElement
          element?.scrollIntoView({behavior: "smooth"})
      }
  }, 1000);
};
