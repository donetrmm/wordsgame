"use client";
import styles from "@/app/page.module.css";
import React, { useState, useEffect, useRef } from "react";
import { wordList } from "../utils/wordlist";

const Game = () => {
  const [actualWord, setActualWord] = useState("");
  const [mezcladaWord, setMezcladaWord] = useState("");
  const [inputValues, setInputValues] = useState([]);
  const [errors, setErrors] = useState(0);
  const [score, setScore] = useState(0);
  const [wordNumero, setWordNumero] = useState(0);
  const inputRefs = useRef([]);
  const primerInputRef = useRef(null);

  const mezclarWord = (word) => {
    const array = word.split("");
    const mezcladoArray = array.reduce(
      (arrayCloned, notUsed, posicionActual) => {
        const randomPosicion = Math.floor(Math.random() * (posicionActual + 1));
        [arrayCloned[posicionActual], arrayCloned[randomPosicion]] = [
          arrayCloned[randomPosicion],
          arrayCloned[posicionActual],
        ];
        return arrayCloned;
      },
      array.slice()
    );
    return mezcladoArray.join("");
  };

  const getWordsAleatorias = (wordArray, count) => {
    const aleatoriasWords = new Set();
    while (aleatoriasWords.size < count) {
      const randomPosicion = Math.floor(Math.random() * wordArray.length);
      aleatoriasWords.add(wordArray[randomPosicion]);
    }
    //console.log(aleatoriasWords)
    return Array.from(aleatoriasWords);
  };

  const wordsElegidas = getWordsAleatorias(wordList, 10);

  useEffect(() => {
    if (wordNumero < wordsElegidas.length) {
      setActualWord(wordsElegidas[wordNumero]);
      setMezcladaWord(mezclarWord(wordsElegidas[wordNumero]));
      primerInputRef.current = inputRefs.current[0];
      primerInputRef.current && primerInputRef.current.focus();
    }
  }, [wordNumero]);

  const handleInputCambio = (index, value) => {
    if (!/^[A-Za-z]$/.test(value)) {
      return;
    }

    const newInputValues = [...inputValues];
    newInputValues[index] = value.toLowerCase();

    if (newInputValues[index] === actualWord[index].toLowerCase()) {
      if (index < actualWord.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      setInputValues(newInputValues);

      if (newInputValues.join("") === actualWord.toLowerCase()) {
        setScore(score + 1);

        if (wordNumero < 9) {
          setWordNumero(wordNumero + 1);
          setInputValues([]);
          setErrors(0);
        }
      }
    } else {
      setErrors(errors + 1);

      if (errors >= 3) {
        if (wordNumero < 9) {
          setWordNumero(wordNumero + 1);
          setInputValues([]);
          setErrors(0);
        }
      }
    }
  };

  const resetGame = () => {
    setActualWord("");
    setMezcladaWord("");
    setInputValues([]);
    setErrors(0);
    setScore(0);
    setWordNumero(0);
    inputRefs.current = [];
    primerInputRef.current = null;
  };

  return (
    <article className={styles.body}>
      <div className={styles.container}>
        <h1>Ordena la palabra</h1>
        <p>Puntuación: {score}</p>
        {wordNumero < 10 && (
          <div>
            <p className={styles.error}>Errores: {errors} / 4</p>
            <p>Palabra a ordenar: {mezcladaWord}</p>
            <div>
              {mezcladaWord.split("").map((letter, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={inputValues[index] || ""}
                  onChange={(e) => handleInputCambio(index, e.target.value)}
                  disabled={errors >= 4 || inputValues[index] === letter}
                  ref={(inputRef) => {
                    inputRefs.current[index] = inputRef;
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setWordNumero(wordNumero + 1);
                setInputValues([]);
                setErrors(0);
              }}
            >
              Siguiente palabra
            </button>
          </div>
        )}
        {wordNumero === 10 && score < 7 && (
          <>
            <p className={styles.winlose}>¡Has perdido!</p>
            <button
              onClick={() => {
                resetGame();
              }}
            >
              Reiniciar juego
            </button>
          </>
        )}

        {wordNumero === 10 && score > 7 && (
          <>
            <p className={styles.winlose}>¡Has ganado!</p>
            <button
              onClick={() => {
                resetGame();
              }}
            >
              Reiniciar juego
            </button>
          </>
        )}
      </div>
    </article>
  );
};

export default Game;
