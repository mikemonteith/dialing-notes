import type { FormEvent } from 'react'
import React, { ChangeEvent, useState } from 'react'

export type FormValues = {
  grind: string
  weightIn: number
  time: number
  weightOut: number
  notes: string
}

export type FormProps = {
  onSubmit: (values: FormValues) => void
}

const Form: React.FC<FormProps> = (props) => {

  const [grind, setGrind] = useState<string>("")
  const [weightIn, setWeightIn] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [weightOut, setWeightOut] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formValues : FormValues = {
      grind,
      weightIn: parseFloat(weightIn),
      time: parseFloat(time),
      weightOut: parseFloat(weightOut),
      notes,
    }
    props.onSubmit(formValues)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='form-floating mb-3'>
        <input
          value={grind}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setGrind(e.target.value)}
          type='text'
          className='form-control'
          id='grindInput'
          placeholder=''
        />
        <label htmlFor='grindInput' className='form-label'>Grind setting</label>
      </div>

      <div className='input-group mb-3'>
        <div className='form-floating'>
          <input
            value={weightIn}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setWeightIn(e.target.value)}
            type='number'
            className='form-control'
            id='weightInInput'
            placeholder=''
            required
          />
          <label htmlFor='weightInInput'>Weight In</label>
        </div>
        <span className='input-group-text'>g</span>
      </div>

      <div className='mb-3'>
        <div className='input-group'>
          <div className='form-floating'>
            <input
              value={time}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => setTime(e.target.value)}
              type='number'
              min='0'
              className='form-control'
              aria-describedby='timeInputHelp'
              id='timeInput'
              placeholder='0'
              required
            />
            <label htmlFor='timeInput'>Time</label>
          </div>
          <span className='input-group-text'>seconds</span>
          </div>
        <div id='timeInputHelp' className='form-text'>Time from first liquid appearing to pump stopping.</div>
      </div>

      <div className='input-group mb-3'>
        <div className='form-floating'>
          <input
            value={weightOut}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setWeightOut(e.target.value)}
            type='number'
            className='form-control'
            id='weightOutInput'
            placeholder=''
            required
          />
          <label htmlFor='weightOutInput'>Weight Out</label>
        </div>
        <span className='input-group-text'>g</span>
      </div>

      <div className='input-group mb-3'>
        <div className='form-floating'>
        <textarea
          value={notes}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setNotes(e.target.value)}
          className='form-control'
          id='notesInput'
          placeholder=''
          required
        />
          <label htmlFor='notesInput'>Notes</label>
        </div>
      </div>

      <button type='submit' className='btn btn-primary'>Save</button>
    </form>
  )
}

export default Form
