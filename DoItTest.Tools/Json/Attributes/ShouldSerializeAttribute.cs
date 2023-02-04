using System.Runtime.CompilerServices;

namespace DoItTest.Tools.Json.Attributes;

public class ShouldSerializeAttribute : Attribute
{
    public string ShouldSerializeMethodName { get; }

    public ShouldSerializeAttribute(string shouldSerializeMethodName, [CallerArgumentExpression("shouldSerializeMethodName")] string? shouldSerializeMethodNameExpression = null)
    {
        if (shouldSerializeMethodNameExpression is null || !shouldSerializeMethodNameExpression.Contains("nameof"))
            throw new Exception("Некорректный формат записи ifTrue в ShouldSerializeAttribute. Ожидалось \"ifTrue: nameof(КлассСвойства.ЕгоЧлен)\"");

        ShouldSerializeMethodName = shouldSerializeMethodNameExpression.Replace("nameof(", "").Replace(")", "");
    }
}