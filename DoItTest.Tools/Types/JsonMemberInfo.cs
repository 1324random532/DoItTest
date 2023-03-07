using System.Reflection;

namespace DoItTest.Tools.Types
{
    internal class JsonMemberInfo
    {
        public PropertyInfo? PropertyInfo { get; }
        public FieldInfo? FieldInfo { get; }

        public String Name { get; }

        public Object? GetValue(Object value)
        {
            if (PropertyInfo is not null)
                return PropertyInfo.GetValue(value);

            if (FieldInfo is not null)
                return FieldInfo.GetValue(value);

            return null;
        }

        public JsonMemberInfo(PropertyInfo? propertyInfo, String name)
        {
            PropertyInfo = propertyInfo;
            Name = name;
        }

        public JsonMemberInfo(FieldInfo? fieldInfo, String name)
        {
            FieldInfo = fieldInfo;
            Name = name;
        }
    }
}