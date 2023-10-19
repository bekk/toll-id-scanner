export const getFormId =
  (setFormId: React.Dispatch<React.SetStateAction<string>>) =>
  (event: {url: string}): void => {
    const url = event.url;
    const formIdParam = url.match(/formId=([^&]+)/);
    if (formIdParam) {
      const id = formIdParam[1];
      setFormId(id);
    }
  };
