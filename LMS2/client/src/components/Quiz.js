import axios from 'axios'
import { useState, useEffect } from 'react'

const Quiz = () => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [active, setActive] = useState('quiz')
    const toggle = (componentName) => {
        setActive(prevComponent => prevComponent === componentName ? null : componentName);
    }
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
    ])
    useEffect(() => {
        // Default question
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    }, [])
    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    }

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
        ]);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Convert the questions array to match the schema structure
            const data = {
                title: name,
                description: desc,
                questions: questions,
            };


            await axios.post('http://localhost:5000/api/auth/quiz', data).then(console.log(data));

            // Reset the form after successful submission
            setQuestions([{ question: '', options: ['', '', ''], correctAnswerIndex: 0 }]);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };


    const quizes = (
        <div className='bg-[#1b1b1b] h-fit flex justify-center gap-4 items-center flex-col pt-20 pb-20'>
            <div className='flex justify-center h-40 w-[60%] items-start rounded-3xl bg-slate-200 gap-2 flex-col'>

                <input className='ml-32 h-[30%] pl-4 text-3xl bg-transparent border-b border-gray-300 focus:border-gray-700 outline-none w-[60%]' onChange={(e) => setName(e.target.value)} placeholder='Untitled Quiz'></input>
                <input placeholder='Quiz Description' className='ml-32 bg-transparent p-2 pl-4 border-b border-gray-300 focus:border-gray-700 outline-none w-[60%]' onChange={(e) => { setDesc(e.target.value) }}></input>
            </div>
            <div className="w-[60%] mx-auto p-4 bg-slate-200 shadow-md rounded-md">
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="mb-6">
                            <label htmlFor={`question${index + 1}`} className="block text-sm font-medium text-gray-700" key={`label${index}`}>
                                Question {index + 1}
                            </label>
                            <input
                                id={`question${index + 1}`}
                                className="mt-2 h-[40px] p-2 block w-full bg-transparent border-b border-gray-300 focus:border-gray-700 outline-none text-xl"
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                placeholder="Enter your question here..."
                                required
                            />
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Options</label>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            placeholder={'Option ' + (optionIndex + 1)}
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                                <select
                                    value={question.correctAnswerIndex}
                                    onChange={(e) => handleQuestionChange(index, 'correctAnswerIndex', Number(e.target.value))}
                                    className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    {question.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={optionIndex}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {index !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveQuestion(index)}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600"
                                >
                                    Remove Question
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600"
                    >
                        Add Question
                    </button>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleSubmit}
                    >
                        Create Quiz
                    </button>
                </form>
            </div>
        </div>
    )
    const [text, setText] = useState('');
    const [textAreaHeight, setTextAreaHeight] = useState('50vh');

    const handleSend = async (e) => {
        e.preventDefault();
        const data = {
            title: name,
            description: desc,
            text: text
        }
        try {
            await axios.post('http://localhost:5000/api/auth/quiz', data).then((res) => {
                console.log(res.data)
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        setText(event.target.value);
        setTextAreaHeight(`${event.target.scrollHeight}px`);
    };

    const assignment = (
        <div className='bg-[#1b1b1b] h-max flex justify-center gap-4 items-center pt-20 pb-40'>
            <div className='h-max w-max'>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea
                    value={text}
                    onChange={handleChange}
                    placeholder="Type something..."
                    style={{ height: textAreaHeight, width: '50vw', backgroundColor: '#E2E8F0' }} className='rounded-3xl p-6 outline-none'></textarea>
            </div>
        </div>
    )
    const response = (
        <div>hello response</div>
    )
    return (
        <>
            <div className='flex justify-between items-center h-[4rem] w-[100%] bg-slate-600 text-gray-50'>
                <div className='ml-4'>
                    <p>File Name : {name}</p>
                </div>
                <button className='mr-8 bg-black pr-6 pl-6 rounded-md shadow-md p-3' onClick={handleSend}>Send</button>
            </div>
            <div className='flex justify-center gap-4 items-center h-[2rem] w-[100%] bg-slate-600 text-gray-50'>
                <button className='focus:border-b' onClick={() => { toggle('quiz') }}>Questions</button>
                <button className='focus:border-b' onClick={() => { toggle('assignment') }}>Assignments</button>
                <button className='focus:border-b' onClick={() => { toggle('responses') }}>Responses</button>
            </div>
            {active === 'quiz' && quizes}
            {active === 'assignment' && assignment}
            {active === 'responses' && response}
        </>
    )
}

export default Quiz
