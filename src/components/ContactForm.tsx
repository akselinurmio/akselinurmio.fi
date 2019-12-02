import React, { MouseEventHandler, useRef, useState } from "react"
import styled from "styled-components"
import createElementId from "../utilities/createElementId"
import getEmoji from "../utilities/getEmoji"
import { backgroundColor, brandColor } from "../variables/colors"
import { easeOutQuint } from "../variables/easings"
import VisuallyHidden from "./VisuallyHidden"
import { mediaLg } from "../variables/mediaQueries"

const StyledForm = styled.form`
  margin-top: 1.2em;
`

const FieldWrapper = styled.div`
  display: block;
  margin-top: 1.2em;
`

const Label = styled.label``

const InputText = styled.input`
  display: block;
  width: 70rem;
  max-width: 100%;
  font: inherit;
  background-color: transparent;
  color: inherit;
  padding: 0.5em;
  border: 2px solid;
  transition: 200ms ${easeOutQuint} border;
  outline-offset: 0;

  ${mediaLg} {
    border-width: 3px;
  }
`

const InputTextArea = InputText.withComponent("textarea")

const Button = styled.button`
  background-color: ${brandColor};
  color: ${backgroundColor};
  font: inherit;
  border: none;
  padding: 1em 2em;
  text-align: inherit;
  cursor: pointer;
  outline-offset: 0;
`
const ButtonSecondary = styled(Button)`
  background-color: transparent;
  color: inherit;
`

const disableMouseFocusing: MouseEventHandler = e => {
  e.preventDefault()
}

const ContactForm = () => {
  const [inputIdHoneypot] = useState(createElementId)
  const [inputIdEmail] = useState(createElementId)
  const [inputIdMessage] = useState(createElementId)

  const messageEl = useRef<HTMLTextAreaElement>(null)

  const addEmojiToMessage: MouseEventHandler = () => {
    const el = messageEl.current

    if (el) {
      // Add space before emoji if there's not one already
      const addSpace = !/(\s|^$)/.test(el.value.slice(-1))
      el.value += (addSpace ? " " : "") + getEmoji()
    }
  }

  return (
    <StyledForm
      name="contact"
      action="/thanks/"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="phone"
    >
      <input type="hidden" name="form-name" value="contact" />

      <VisuallyHidden>
        <Label htmlFor={inputIdHoneypot}>Don’t fill up this field</Label>
        <InputText
          name="phone"
          id={inputIdHoneypot}
          tabIndex={-1}
          autoComplete="off"
        />
      </VisuallyHidden>

      <FieldWrapper>
        <Label htmlFor={inputIdEmail}>Email address</Label>
        <InputText name="email" id={inputIdEmail} type="email" required />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor={inputIdMessage}>Message</Label>
        <InputTextArea
          name="message"
          id={inputIdMessage}
          ref={messageEl}
          required
          rows={4}
          aria-live="polite"
        />
      </FieldWrapper>

      <FieldWrapper>
        <Button type="submit">Send</Button>
        <ButtonSecondary
          type="button"
          aria-label="Add an emoji to your message"
          aria-controls={inputIdMessage}
          onClick={addEmojiToMessage}
          onMouseDown={disableMouseFocusing}
        >
          +😍
        </ButtonSecondary>
      </FieldWrapper>
    </StyledForm>
  )
}

export default ContactForm
