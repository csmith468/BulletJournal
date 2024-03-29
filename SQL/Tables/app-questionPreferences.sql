SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[questionPreferences](
	[questionPreferencesID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[createdDatetime] [datetime] NULL,
	[modifiedDatetime] [datetime] NULL,
	[checklistTypeID] [int] NOT NULL,
	[key] [nvarchar](100) NOT NULL,
	[keyNumber] [int] NULL,
	[label] [nvarchar](100) NOT NULL,
	[questionKindID] [int] NOT NULL,
	[standardQuestionID] [int] NULL,
	[isVisible] [bit] NULL,
	[questionOrder] [int] NULL,
	[minValue] [int] NULL,
	[maxValue] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[questionPreferences] ADD PRIMARY KEY CLUSTERED 
(
	[questionPreferencesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [app].[questionPreferences]  WITH CHECK ADD  CONSTRAINT [FK_QuestionPreferencesQuestionKind] FOREIGN KEY([questionKindID])
REFERENCES [app_sys].[questionKind] ([questionKindID])
GO
ALTER TABLE [app].[questionPreferences] CHECK CONSTRAINT [FK_QuestionPreferencesQuestionKind]
GO
ALTER TABLE [app].[questionPreferences]  WITH CHECK ADD  CONSTRAINT [FK_QuestionPreferencesStandard] FOREIGN KEY([standardQuestionID])
REFERENCES [app_sys].[standardQuestions] ([standardQuestionID])
GO
ALTER TABLE [app].[questionPreferences] CHECK CONSTRAINT [FK_QuestionPreferencesStandard]
GO
ALTER TABLE [app].[questionPreferences]  WITH CHECK ADD  CONSTRAINT [FK_QuestionPreferencesTableType] FOREIGN KEY([checklistTypeID])
REFERENCES [app_sys].[checklistType] ([checklistTypeID])
GO
ALTER TABLE [app].[questionPreferences] CHECK CONSTRAINT [FK_QuestionPreferencesTableType]
GO
ALTER TABLE [app].[questionPreferences]  WITH CHECK ADD  CONSTRAINT [FK_QuestionPreferencesUser] FOREIGN KEY([userID])
REFERENCES [app].[user] ([userID])
GO
ALTER TABLE [app].[questionPreferences] CHECK CONSTRAINT [FK_QuestionPreferencesUser]
GO
