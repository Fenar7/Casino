"use client";

// components/AnimatedText.js
import { useEffect, useRef } from 'react';
import styles from './AnimatedText.module.css';

const AnimatedText = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationStarted = false;
        let intervalId;

        const startAnimation = () => {
            let text = '2345';
            const chars = '1234567890'.split('');
            const scale = 50;
            const breaks = 0.003;
            const endSpeed = 0.05;
            const firstLetter = 220;
            const delay = 40;

            text = text.split('');
            const charMap = [];
            const offset = [];
            const offsetV = [];

            for (let i = 0; i < chars.length; i++) {
                charMap[chars[i]] = i;
            }

            for (let i = 0; i < text.length; i++) {
                const f = firstLetter + delay * i;
                offsetV[i] = endSpeed + breaks * f;
                offset[i] = -(1 + f) * (breaks * f + 2 * endSpeed) / 2;
            }

            const resizeCanvas = () => {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
            };

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const loop = () => {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
                ctx.fillStyle = '#622';
                ctx.fillRect(0, (canvas.height - scale) / 2, canvas.width, scale);

                for (let i = 0; i < text.length; i++) {
                    ctx.fillStyle = '#ccc';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.setTransform(1, 0, 0, 1, Math.floor((canvas.width - scale * (text.length - 1)) / 2), Math.floor(canvas.height / 2));

                    let o = offset[i];
                    while (o < 0) o++;
                    o %= 1;

                    const h = Math.ceil(canvas.height / 2 / scale);
                    for (let j = -h; j < h; j++) {
                        let c = charMap[text[i]] + j - Math.floor(offset[i]);
                        while (c < 0) c += chars.length;
                        c %= chars.length;

                        const s = 1 - Math.abs(j + o) / (canvas.height / 2 / scale + 1);
                        ctx.globalAlpha = s;
                        ctx.font = `${scale * s}px Helvetica`;
                        ctx.fillText(chars[c], scale * i, (j + o) * scale);
                    }

                    offset[i] += offsetV[i];
                    offsetV[i] -= breaks;
                    if (offsetV[i] < endSpeed) {
                        offset[i] = 0;
                        offsetV[i] = 0;
                    }
                }

                requestAnimationFrame(loop);
            };

            requestAnimationFrame(loop);
        };

        const checkTimeAndStartAnimation = async() => {
            const now = new Date();
            console.log(now)
            let prevdate = now
            if(prevdate!=now){
                console.log('date changed')
                const date = now.toISOString().split('T')[0]; // 'YYYY-MM-DD' format
                const response = await fetch('/api/setDate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({date}),
                });
            }
            const hours = now.getHours();
            const minutes = now.getMinutes();

            console.log(hours+":"+minutes)

            // Example: Start animation if it's between 10:00 and 10:05
            if (hours === 17 && minutes >= 1 && !animationStarted) {
                startAnimation();
                animationStarted = true;
                clearInterval(intervalId); // Stop checking the time once the animation has started
            }
        };

        intervalId = setInterval(checkTimeAndStartAnimation, 1000); // Check every second

        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
};

export default AnimatedText;
