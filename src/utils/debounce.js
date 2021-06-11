function debounce(func, time) {
    let timerId;
    return function () {
      clearTimeout(timerId);
      timerId = setTimeout(func, time);
    };
  }

export  {debounce};