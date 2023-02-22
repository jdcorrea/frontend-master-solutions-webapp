import React, { ComponentPropsWithRef, useEffect, useState } from "react"
import styles from '@/styles/InteractiveRating.module.scss'
import Image from "next/image"

import { RatingProvider, useRatings, useRatingsDispatch } from './ratingContext'

type PropsInteractiveRating = {
  ratingNumber?: number,
  isRated?: boolean
}

export const InteractiveRating = ( { ratingNumber = 5 }: PropsInteractiveRating) => {
  return (
    <RatingProvider ratingNumber={ratingNumber} >
      <DisplayCard />
    </RatingProvider>
  )
}

function DisplayCard() {
  const { ratingData }  = useRatings()
  const { isRated } = ratingData
  return(
    <>
      {
        isRated
          ? <ThankyouCard />
          : <RatingCard />
      }
    </>
  )
}

function RatingCard () {
  const { ratingData, dispatch }  = useRatings()
  const { selectedRatingByUser } = ratingData

  const validateSubmit = () => {
    if (selectedRatingByUser > -1) {
      dispatch({ type: 'updateRated', payload: true})
      return true
    } else {
      return false
    }
  }

  return (
    <article className={styles.ratingCard}>
      <div className={`${styles.button} ${styles.rcCardLogo}`} >
        <Image src='./img/icon-star.svg' alt="" width={14} height={14}
          className={styles.rcIconStar}
        />
      </div>
      <h3 className={styles.rcTitle}>How did we do?</h3>
      <p className={styles.rcDescription}>
        Please let us know how we did with your support request. All
        feedback is appreciated to help us improve our offering!
      </p>
      <ButtonList className={styles.rcCustomRatingButtonList} />
      <button onClick={() => validateSubmit()} className={styles.rcSubscribeButton} >
        SUBMIT
      </button>
    </article>
  )
}

function ThankyouCard() {
  const { ratingData }  = useRatings()
  const { ratingNumber, selectedRatingByUser } = ratingData

  return (
    <article className={styles.thankyouCard}>
      <Image src='./img/illustration-thank-you.svg' alt="thank you for rating us" width={144} height={96}
        className={styles.tyImage}
      />
      <div className={styles.tySelectedRating}>
        <span>You selected {(selectedRatingByUser + 1)} out of {ratingNumber}</span>
      </div>
      <h3 className={styles.tyTitle}>Thank you!</h3>
      <p className={styles.tyDescription}>
        We appreciate you taking the time to give a rating.
        If you ever need more support, don&apos;t hesitate to get in touch!
      </p>
    </article>
  )
}

type PropsButtonList = {
  className?: string,
}

function ButtonList( { className }: PropsButtonList) {
  const { ratingData, dispatch }  = useRatings()
  const { ratingNumber, selectedRatingByUser } = ratingData
  const buttonListValues = Array.from(Array(ratingData. ratingNumber).keys()).map(ele => {
    return {
      id: ele,
      value: (ele + 1),
      isSelected: ele === selectedRatingByUser ? true : false
    }
  })

  const CustomStyle = className ? `${styles.ratingButtonList} ${className}` : styles.ratingButtonList

  const selectedButton = (keyButton: number): void => {
    dispatch({ type: 'updateSelectedRatingByUser', payload: keyButton})
  }

  return (
    <div className={CustomStyle}>
      {
        ratingNumber && ratingNumber > 0
        ? buttonListValues.map(button => {
            return (
              <Button key={button.id} className={`${button.isSelected ? styles.clickableButtonActive : ''}`} 
                onClick={() => {
                  selectedButton(button.id)
                  }
                }
              >
                {button.value}
              </Button>
            )
          })
        : null
      }
    </div>
  )
}

function Button( {children, className, ...props }: ComponentPropsWithRef<"button">) {
  const CustomStyle = className ? `${styles.clickableButton} ${className}` : styles.clickableButton

  return (
    <button className={CustomStyle} {...props}>{children}</button>
  )
}