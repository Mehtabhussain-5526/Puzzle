import React, { useState } from "react";
const Sizeinput = () => {
  const [entree, setEntree] = useState(false);
  const [size, setSize] = useState(0);
  const [arrayS, setArrayS] = useState([]);
  const [plainArray, setPlainArray] = useState([]);
  const [win, setWin] = useState(false);
  let indexX;
  let x;
  let indexY;
  let y;
  let truthV = false;
  const handleSize = (e) => {
    if (e.target.value > 1 && e.target.value < 9) {
      setEntree(true);
      setArrayS([]);
      setSize(e.target.value);
    } else {
      setEntree(false);
      setSize(0);
      setArrayS([]);
    }
  };
  const sqRoot = size * size;
  const seqencedArray = [];
  const shuffuledArray = [];
  const handleSuffuling = (e) => {
    e.preventDefault();
    if (entree == true) {
      for (let i = 1; i <= sqRoot; i++) {
        seqencedArray.push(i);
        shuffuledArray.push(i);
      }
      for (let i = shuffuledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = shuffuledArray[i];
        shuffuledArray[i] = shuffuledArray[j];
        shuffuledArray[j] = k;
      }
      setPlainArray(seqencedArray);
      setArrayS(shuffuledArray);
    }
  };
  const handleClose = () => {
    setArrayS([]);
    return setWin(false);
  };
  const comp = () => {
    if (arrayS.toString() == plainArray.toString()) {
      setWin(true);
    }
  };
  return (
    <>
      <div>
        <form className="p-[25px] flex justify-center items-center gap-2">
          <label className="w-auto text-[#F87171] text-xl">
            Enter Puzzle Size :
          </label>
          <input
            onChange={handleSize}
            id="givensize"
            className="border border-[#F87171] rounded-md w-80 p-[10px] shadow-lg"
            type="number"
            name="size"
            min={2}
            max={8}
            required
            placeholder="Enter a number"
          />
          <input
            onClick={handleSuffuling}
            className="bg-[#F87171] rounded-xl text-[#ffffff] h-[48px] w-[96px] shadow-lg"
            type="submit"
            value="Create"
          />
        </form>
      </div>
      <div
        id="main-div"
        className={` ml-[28px] mr-[28px] border-8 border-[#F87171] rounded-md 
        ${size < 2 && "py-[20px]"} ${
          size == 2 && " grid grid-cols-2 grid-rows-2 gap-y-9 py-[20px]"
        } ${size == 3 && " grid grid-cols-3 grid-rows-3 gap-y-9 py-[20px]"} ${
          size == 4 && " grid grid-cols-4 grid-rows-4 gap-y-9 py-[20px]"
        } ${size == 5 && " grid grid-cols-5 grid-rows-5 gap-y-9 py-[20px]"} ${
          size == 6 && " grid grid-cols-6 grid-rows-6 gap-y-9 py-[20px]"
        } ${size == 7 && " grid grid-cols-7 grid-rows-7 gap-y-9 py-[20px]"} ${
          size == 8 && " grid grid-cols-8 grid-rows-8 gap-y-9 py-[20px]"
        } ${size > 8 && "py-[20px]"}  `}
      >
        {arrayS.map((data, index) => {
          return (
            <div
              id={index}
              onDragStart={(e) => {
                indexX = e.target.id;
                x = arrayS[indexX];
              }}
              onDragEnter={(e) => {
                indexY = e.target.id;
                y = arrayS[indexY];
              }}
              onDragOver={() => {
                truthV = true;
              }}
              onDragEnd={() => {
                if (truthV == true) {
                  let updatedArr = arrayS;
                  updatedArr[indexX] = y;
                  updatedArr[indexY] = x;
                  setArrayS([...updatedArr]);
                }
                truthV = false;
                comp();
              }}
              className="bg-[#60A5FA] text-center border-4 rounded-lg h-[128px] w-[128px] pt-[55px] pb-[50px] cursor-move hover:border-[5px] hover:border-[#F87171] text-white font-[20px] mx-auto my-auto filter drop-shadow-2xl "
              draggable="true"
            >
              {data}
            </div>
          );
        })}
        {win && (
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="rounded-lg p-8  flex bg-red-400 pt-10 pb-3 z-50  h-52 flex-col justify-between items-center opacity-75 w-[50%] fixed top-1/4 left-1/4 border border-blue-600">
              <p className="text-[#3F6AD0] text-2xl">Welcome ! To the Team</p>
              <button
                onClick={handleClose}
                className="bg-[#8EB3DD] w-32 h-11 hover:bg-[#699CDC] text-[#ffffff]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sizeinput;
