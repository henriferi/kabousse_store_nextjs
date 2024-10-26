import { add } from "./functions/basicFunction";
import { describeValue, getfirstItem } from "./functions/genericAndUnion";
import { greetUser } from "./functions/userGreeting";




export default function Home() {


  const numbers = [1, 2, 3, 4, 5, 6, 7,];
  const words = ['apple', 'banana', 'orange'];
  const mixedValue1 = 42;
  const mixedValue2 = 'Hello';

  return (
    <div className="justify-center flex-col ">
      <p>First number is: {getfirstItem(numbers)}</p>
      <p>First Word is: {getfirstItem(words)}</p>
      <p>{describeValue(mixedValue1)}</p>
      <p>{describeValue(mixedValue2)}</p>
    </div>
  );
}
