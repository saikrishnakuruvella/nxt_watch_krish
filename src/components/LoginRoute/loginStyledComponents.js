import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
`

export const LoginCon = styled.form`
  background-color: #ffffff;

  height: 400px;
  width: 400px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
  @media (max-width: 560px) {
    height: 330px;
    width: 330px;
  }
`
export const InputElement = styled.input`
  width: 350px;
  height: 28px;
  background-color: transparent;
  color: #475569;
  border: 1px solid #475569;
  border-radius: 6px;
  padding-left: 10px;
  margin-top: 10px;
  @media (max-width: 560px) {
    height: 28px;
    width: 290px;
  }
`

export const LabelElement = styled.label`
  color: #475569;
  font-size: 17;
  font-weight: bold;
  margin-bottom: 10px;
`
