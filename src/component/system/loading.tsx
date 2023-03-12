import { useState, useEffect, forwardRef } from 'react'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
function Random_Integer(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function Loading() {
    return (
        <div className={styles.card}>
            <label>
                <Image key={"loading"}
                    className={styles.card} 
                    src = {'/art/system/loading.gif'} 
                    width="100"
                    height="100"
                    alt = {'/art/system/loading.gif'}
                    onClick = {() => { console.log(`Вы нажали на планету загрузку`); }}
                />        
        </label>                            
        </div>
    );
}