import { HomeLinks } from 'apps/infrastructure/links'
import { UsersProvider } from 'domain/users/usersProvider'
import { useState } from 'react'
import { useBlockUi } from 'sharedComponents/blockUi/blockUiContext'
import { Button } from 'sharedComponents/buttons/button'
import { Content } from 'sharedComponents/content/content'
import { Input } from 'sharedComponents/inputs/input'
import { useNotification } from 'sharedComponents/notification/store/notificationStore'

export function Authorization() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [isRegistration, setIsRegistration] = useState(false);

    const { showError } = useNotification()
    const blockUi = useBlockUi();

    async function logIn() {
        blockUi(async () => {
            const authorizationResult = await UsersProvider.logIn(login, password);
            if (!authorizationResult.isSuccess)
                return showError(authorizationResult.errors[0].message)

            window.location.href = HomeLinks.home
        })
    }

    async function registration() {
        blockUi(async () => {

            if (password != repeatPassword)
                return showError("Пароль не совпадает")

            const registrationResult = await UsersProvider.registration(login, password);
            if (!registrationResult.isSuccess)
                return showError(registrationResult.errors[0].message)

            window.location.href = HomeLinks.home
        })
    }

    function changeLogIn(isRegistration: boolean) {
        setLogin("")
        setPassword("")
        setRepeatPassword("")
        setIsRegistration(isRegistration)
    }

    return (
        <Content withSidebar={false}>
            {isRegistration
                ? <>
                    <h1>Регистрация</h1>
                    <Input type='text' label="Логин" value={login} onChange={setLogin} sx={{ mb: 2, width: 250 }} />
                    <Input type='password' label="Пароль" value={password} onChange={setPassword} sx={{ mb: 2, width: 250 }} />
                    <Input type='password' label="Повторите пароль" value={repeatPassword} onChange={setRepeatPassword} sx={{ mb: 2, width: 250 }} />
                    <Button onClick={registration} title='Зарегистрироваться' sx={{ mb: 2, width: 250, height: 60 }} >Регистрация</Button>
                    <Button onClick={() => changeLogIn(false)}
                        title='Выполнить вход' sx={{ mb: 2, width: 250, height: 60 }} variant={"contained"}>Войти</Button>
                </>
                : <>
                    <h1>Авторизация</h1>
                    <Input type='text' label="Логин" value={login} onChange={setLogin} sx={{ mb: 2, width: 250 }} />
                    <Input type='password' label="Пароль" value={password} onChange={setPassword} sx={{ mb: 2, width: 250 }} />
                    <Button onClick={logIn} title='Выполнить вход' sx={{ mb: 2, width: 250, height: 60 }}>Войти</Button>
                    <Button onClick={() => changeLogIn(true)} title='Зарегистрироваться' sx={{ mb: 2, width: 250, height: 60 }} variant={"contained"}>Регистрация</Button>
                </>
            }
        </Content>
    )
}
