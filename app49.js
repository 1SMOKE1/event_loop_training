// Function that simulates an asynchronous operation with a random delay
async function asyncOperation() {
  const delay = Math.random() * 2000 + 1000; // Random delay between 1000ms and 3000ms
  await new Promise((resolve) => setTimeout(resolve, delay));
  return `Async operation completed after ${delay}ms`;
}

// Using async/await to call the asynchronous function
async function main() {
  console.log("Start of the script");

  try {
    const result1 = await asyncOperation();
    console.log(result1);

    const result2 = await asyncOperation();
    console.log(result2);
  } catch (error) {
    console.error("An error occurred:", error);
  }

  console.log("End of the script");
}

main();
