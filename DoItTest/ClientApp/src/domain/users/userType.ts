
export enum RoleType {
   Super = 1,
   TestCreator = 2
}

export namespace RoleType {
   export function getDisplayName(role: RoleType): string {
      switch (role) {
         case RoleType.Super:
            return "Супер пользователь";
         case RoleType.TestCreator:
            return "Создатель тестов";
         default:
            throw "Не существующее занчение enum"
      }
   }
}
