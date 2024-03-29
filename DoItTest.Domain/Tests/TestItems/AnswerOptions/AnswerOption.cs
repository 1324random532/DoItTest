﻿using DoItTest.Tools.Json.Converters;
using System.Text.Json.Serialization;

namespace DoItTest.Domain.Tests.TestItems.AnswerOptions
{
    [JsonConverter(typeof(DomainConverter<AnswerOption>))]
    public abstract class AnswerOption
    {
        public Guid Id { get; }
        public Guid TestItemId { get; }
        public TestItemType Type { get; }

        public AnswerOption(Guid id, Guid testItemId, TestItemType type)
        {
            Id = id;
            TestItemId = testItemId;
            Type = type;
        }
    }
}
