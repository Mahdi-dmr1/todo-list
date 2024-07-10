"use client";

import { Tick, Trash } from "../../svg";
import { useState } from "react";
import { Modal } from "./components/Modal";
import { useTodoStore } from "../../store";

export default function Home() {
    //modal state
    const [modal, setModal] = useState<boolean>(false);

    //booleans for checkboxes
    const [showDone, setShowDone] = useState<boolean>(true);
    const [showUndone, setShowUndone] = useState<boolean>(true);

    //title and description inputs get stored here
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    //imported functions from store
    const addTask = useTodoStore((state) => state.addTask);
    const removeTask = useTodoStore((state) => state.removeTask);
    const toggleTaskDone = useTodoStore((state) => state.toggleTaskDone);
    const tasks = useTodoStore((state) => state.tasks);

    //handle add task button to send data to store
    const handleAddTask = () => {
        if (title && description) {
            addTask(title, description);
            setTitle("");
            setDescription("");
            setModal(!modal);
        }
    };

    //modal open and close boolean
    const toggleModal = () => {
        setModal(!modal);
        console.log("toggle modal is currently: ", modal);
    };

    //checks to see if task done and showDone states are both true to show and stores it
    const filteredTasks = tasks.filter((task) => (showDone && task.done) || (showUndone && !task.done));

    return (
        <div className="p-10 mx-auto max-w-screen-lg">
            <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-lg py-6 px-16 mt-10  ">
                <h1 className="text-4xl font-semibold text-blue-600">لیست کار ها</h1>
                <h1 className="text-gray-600 font-semibold mt-2">
                    برای مدیریت کار های روزانه خود روی دکمه اضافه کردن کلیک کنید
                </h1>
                <button
                    onClick={() => toggleModal()}
                    className="mt-8 bg-gradient-to-tr from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-950  hover:scale-105 duration-300 rounded-lg py-2 px-4 shadow-lg text-gray-100"
                >
                    اضافه کردن
                </button>
            </div>
            <Modal show={modal} onClose={toggleModal}>
                <h2 className="text-xl font-bold mb-4">اطلاعات مورد نظر را وارد کنید</h2>
                <div className="flex flex-col">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="bg-gray-300 rounded-md py-1 px-1 text-gray-700 outline-none border focus:border-blue-500 border-gray-400"
                        placeholder="تسک.."
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="bg-gray-300 rounded-md py-1 px-1 text-gray-700 outline-none border focus:border-blue-500 border-gray-400 mt-3"
                        placeholder="توضیحات.."
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleAddTask}
                        className="mt-5 bg-gradient-to-tr from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-950  hover:scale-105 duration-300 rounded-lg py-2 px-4 shadow-lg text-gray-100"
                    >
                        ثبت
                    </button>
                </div>
            </Modal>

            <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-lg py-6 px-16 mt-10">
                <div className="flex justify-around w-full">
                    <h1 className=" text-4xl font-semibold text-blue-600">تسک ها</h1>
                    <div className="flex items-center">
                        <label htmlFor="">تمام شده ها</label>
                        <input
                            type="checkbox"
                            checked={showDone}
                            onChange={(e) => setShowDone(e.target.checked)}
                            name="done"
                            id=""
                        />

                        <label htmlFor="" className="mr-8">
                            تمام نشده ها
                        </label>
                        <input
                            type="checkbox"
                            checked={showUndone}
                            onChange={(e) => setShowUndone(e.target.checked)}
                            name="undone"
                            id=""
                        />
                    </div>
                </div>

                {/* smaple of a task that is not done yet */}
                {filteredTasks.map((task, key) => (
                    <div
                        key={key}
                        className={
                            task.done !== true
                                ? "mt-5 bg-gradient-to-tr from-blue-600 to-blue-800 flex  justify-between px-4 py-4 w-full rounded-lg shadow-lg"
                                : "mt-5 bg-gradient-to-tr from-green-500 to-green-700 flex  justify-between px-4 py-4 w-full rounded-lg shadow-lg"
                        }
                    >
                        <div>
                            <h1 className="text-white text-2xl font-semibold">{task.title}</h1>
                            <p className="ml-3 text-sm text-gray-100 mt-2">{task.description}</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                disabled={task.done === true ? true : false}
                                onClick={() => toggleTaskDone(task.id)}
                            >
                                <Tick className={task.done === true ? "hidden" : "text-3xl ml-3"} />
                            </button>

                            <button onClick={() => removeTask(task.id)}>
                                <Trash className="text-3xl" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
