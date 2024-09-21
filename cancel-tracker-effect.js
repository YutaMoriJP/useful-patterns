const state = {};

let canceled = false;
const token = Object.defineProperty({}, "canceled", {
  get() {
    console.log("%c get called", "color: blue");
    return canceled;
  },
  set(newCanceled) {
    console.log("%c set called", "color: red");
    canceled = newCanceled;
  }
});

const action = () => {
  const asyncAction = async () => {
    try {
      console.log("try runs");
      await new Promise((res) => setTimeout(res, 1000 * 5));
      if (canceled) return;
      state.count = state.count ?? 0 + 1;
    } catch (error) {
      console.log(error);
      console.log("catch runs");
    } finally {
      console.log("finally runs");
    }
  };

  asyncAction();

  return token;
};

const effect = () => {
  let token = action();

  return () => {
    token.canceled = true;
  };
};
