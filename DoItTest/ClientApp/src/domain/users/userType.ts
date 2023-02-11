
export enum RoleType {
   Super = 1
}

export namespace RoleType {
   export function getDisplayName(role: RoleType): string {
      switch (role) {
         case RoleType.Super:
            return "Super";
         default:
            throw "Не существующее занчение enum"
      }
   }
}
