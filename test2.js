function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  const x = await resolveAfter2Seconds(10); // Pauses for 2 seconds
  console.log(x); // 10
}

f1();
console.log("This runs immediately, before the '10' is logged.");
