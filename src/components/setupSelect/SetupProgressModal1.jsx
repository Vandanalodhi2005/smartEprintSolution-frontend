import React, { useEffect, useRef, useState } from 'react';
import { FaGear, FaPrint, FaCheck } from 'react-icons/fa6';

const modelsearchinput = localStorage.getItem('modelSearchInput');

const defaultSteps = [
    {
        label: 'Checking Device Compatibility',
        right: 'Verified',
        progress: 0,
        status: '',
    },
    {
        label: `Downloading Drivers for ${modelsearchinput || 'Printer'} `,
        right: 'Completed (145 MB)',
        progress: 0,
        status: '',
    },
    {
        label: 'Installing Package...',
        right: 'Initializing Installation...',
        progress: 0,
        status: '',
    }
];


export default function SetupProgressModal({ open, onClose, printer = 'Officejet', user = 'Michal', onError }) {
    const modalRef = useRef(null);
    const [stepStates, setStepStates] = useState(defaultSteps);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (!open) return;
        setStepStates(defaultSteps);
        setActiveStep(0);
        let timers = [];

        function animateStep(idx) {
            setActiveStep(idx);
            setStepStates((prev) =>
                prev.map((s, i) =>
                    i < idx
                        ? { ...s, progress: 100, status: 'done' }
                        : i === idx
                        ? { ...s, progress: 0, status: 'active' }
                        : { ...s, progress: 0, status: '' }
                )
            );
            let prog = 0;
            const interval = setInterval(() => {
                prog += 5;
                setStepStates((prev) =>
                    prev.map((s, i) =>
                        i === idx ? { ...s, progress: Math.min(prog, 100), status: 'active' } : s
                    )
                );
                // For the last step, stop at 60% and trigger error after 4s
                if (idx === 2 && prog >= 60) {
                    clearInterval(interval);
                    setStepStates((prev) =>
                        prev.map((s, i) =>
                            i === idx ? { ...s, progress: 60, status: 'active' } : s
                        )
                    );
                    timers.push(setTimeout(() => {
                        if (onError) onError();
                    }, 4000));
                } else if (prog >= 100) {
                    clearInterval(interval);
                    setStepStates((prev) =>
                        prev.map((s, i) =>
                            i === idx ? { ...s, progress: 100, status: 'done' } : s
                        )
                    );
                    if (idx < defaultSteps.length - 1) {
                        timers.push(setTimeout(() => animateStep(idx + 1), 500));
                    }
                }
            }, 25);
            timers.push(interval);
        }

        timers.push(setTimeout(() => animateStep(0), 400));
        return () => timers.forEach(clearInterval);
    }, [open, printer, onError]);

    useEffect(() => {
        if (open && modalRef.current) {
            modalRef.current.classList.remove('opacity-0', 'scale-95');
            modalRef.current.classList.add('opacity-100', 'scale-100');
        }
    }, [open]);

    if (!open) return null;

    // Only show the modal overlay, nothing else
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
            <div
                ref={modalRef}
                className="transition-all duration-300 transform opacity-0 scale-95 bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                <div className="flex items-center px-4 md:px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <FaGear className="text-gray-400 mr-2 animate-spin-slow" />
                    <span className="font-semibold text-gray-700 text-base md:text-lg">Device Setup Assistant</span>
                    <div className="ml-auto flex gap-1.5 md:gap-2">
                        <button onClick={onClose} className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"></button>
                        <button onClick={onClose} className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"></button>
                        <button onClick={onClose} className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"></button>
                    </div>
                </div>
                <div className="px-5 md:px-8 py-6 md:py-8">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-50 p-3 rounded-xl mr-4">
                            <FaPrint className="text-blue-600 text-2xl md:text-3xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-lg md:text-xl font-bold text-gray-800 leading-tight truncate">{printer}</div>
                            <div className="text-gray-500 text-xs md:text-sm mt-0.5">Authorized User: {user}</div>
                        </div>
                    </div>
                    
                    <div className="space-y-6 md:space-y-8">
                        {stepStates.map((step, idx) => (
                            <div key={step.label} className="relative">
                                <div className="flex items-start md:items-center">
                                    <div className="mt-1 md:mt-0 mr-4 flex-shrink-0">
                                        {step.status === 'done' ? (
                                            <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <FaCheck className="text-green-600 text-xs md:text-sm" />
                                            </div>
                                        ) : step.status === 'active' ? (
                                            <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                                        ) : (
                                            <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-gray-200 rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2">
                                            <span className={`font-semibold text-sm md:text-base truncate ${step.status === 'active' ? 'text-blue-700' : 'text-gray-700'}`}>
                                                {step.label}
                                            </span>
                                            {step.status === 'done' && (
                                                <span className="text-[10px] md:text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                                                    {step.right}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 md:h-2 mt-2 md:mt-3 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${
                                                    step.status === 'done' 
                                                    ? 'bg-blue-600' 
                                                    : step.status === 'active' 
                                                    ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                                                    : 'bg-gray-200'
                                                }`}
                                                style={{ width: `${step.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                {idx < stepStates.length - 1 && (
                                    <div className="absolute left-[10px] md:left-[11px] top-6 md:top-7 bottom-[-24px] md:bottom-[-32px] w-[2px] bg-gray-100 -z-10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
