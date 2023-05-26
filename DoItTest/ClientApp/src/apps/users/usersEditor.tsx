import { Box } from '@mui/material'
import { UsersLinks } from 'apps/users/links'
import { UserBlank } from 'domain/users/userBlank'
import { UsersProvider } from 'domain/users/usersProvider'
import { RoleType } from 'domain/users/userType'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlockUi } from 'sharedComponents/blockUi/blockUiContext'
import { Button } from 'sharedComponents/buttons/button'
import { IconButton } from 'sharedComponents/buttons/iconButton'
import { Content } from 'sharedComponents/content/content'
import { Input } from 'sharedComponents/inputs/input'
import { useNotification } from 'sharedComponents/notification/store/notificationStore'
import useComponent from "tools/components/useComponent"
import { Enum } from 'tools/enum'

export function UserEditor() {

    const routeParams = useParams();

    const { showError, showSuccess } = useNotification()

    const blockUi = useBlockUi();

    const roles = useMemo<RoleType[]>(() => Enum.getNumberValues(RoleType), []);

    const [userBlank, setBlank] = useState<UserBlank>(UserBlank.getDefault)

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                const userId = routeParams.userId ?? null
                if (userId == null) return

                const user = await UsersProvider.getUserById(userId)
                if (user == null) return;

                setBlank(UserBlank.formUser(user))
            })
        }
    })

    const navigateTo = useNavigate();

    async function save() {
        blockUi(async () => {
            const result = await UsersProvider.saveUser(userBlank);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }

            showSuccess("Сохранение выполнено")
            navigateTo(UsersLinks.list, { replace: true })
        })
    }

    function changeLogin(login: string) {
        setBlank(userBlank => ({ ...userBlank, login }))
    }

    function changePassword(password: string) {
        setBlank(userBlank => ({ ...userBlank, password }))
    }

    function changeRole(role: RoleType | null) {
        setBlank(userBlank => ({ ...userBlank, role }))
    }

    return (
        <Content withSidebar={true}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <IconButton icon="back" onClick={() => history.back()} title="Назад" />
                <h1>{userBlank.id == null ? "Добавить" : "Изменить"}</h1>
            </Box>
            <Button onClick={save} title='Сохранить именения' sx={{ mb: 2, width: 250, height: 60 }}>Сохранить</Button>
            <Input type='text' label="Логин" value={userBlank.login} onChange={changeLogin} sx={{ mb: 2, width: 250 }} />
            <Input type='text' label="Пароль" value={userBlank.password} onChange={changePassword} sx={{ mb: 2, width: 250 }} />
            <Input
                type='select'
                label="Роль"
                options={roles}
                value={userBlank.role}
                getOptionLabel={RoleType.getDisplayName}
                onChange={changeRole}
                sx={{ mb: 2, width: 250 }}
            />
        </Content>
    )
}
