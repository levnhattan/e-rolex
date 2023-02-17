import React, { useState, useEffect } from 'react'

const Clock = () => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let interval;
    const countDown = () => {
        const des = new Date('Dec 28, 2022').getTime();
        // console.log(des);
        interval = setInterval(() => {

            const now = new Date().getTime();
            const diff = des - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(diff % (1000 * 60) / 1000);

            if (des < 0) {
                clearInterval(interval.current)
            }
            else {
                setDays(days*-1);
                setHours(hours*-1);
                setMinutes(minutes*-1);
                setSeconds(seconds*-1);
            }
        },1000)
    }
    useEffect(() => {
        countDown()
    },)
    return (
        <div className="clock__wrapper d-flex align-items-center gap-3">
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{days}</h1>
                    <h5 className="text-white fs-6">Days</h5>
                </div>
                <span className="text-white fs-3">:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{hours}</h1>
                    <h5 className="text-white fs-6">Hours</h5>
                </div>
                <span className="text-white fs-3">:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{minutes}</h1>
                    <h5 className="text-white fs-6">Minutes</h5>
                </div>
                <span className="text-white fs-3">:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className="text-center">
                    <h1 className="text-white fs-3 mb-2">{seconds}</h1>
                    <h5 className="text-white fs-6">Seconds</h5>
                </div>
            </div>
        </div>
    )
}

export default Clock