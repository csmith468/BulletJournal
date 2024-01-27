SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app].[dailyChecklist](
	[DailyChecklistID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[Breakfast] [bit] NULL,
	[Lunch] [bit] NULL,
	[Dinner] [bit] NULL,
	[Fruits] [bit] NULL,
	[Vegetables] [bit] NULL,
	[Read] [bit] NULL,
	[WentOutside] [bit] NULL,
	[Showered] [bit] NULL,
	[Journaled] [bit] NULL,
	[Meditated] [bit] NULL,
	[CheckEmails] [bit] NULL,
	[CheckTexts] [bit] NULL,
	[CommitmentsMet] [bit] NULL,
	[Steps] [int] NULL,
	[Spending] [float] NULL,
	[ScreenTime] [float] NULL,
	[HoursWorked] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app].[dailyChecklist] ADD PRIMARY KEY CLUSTERED 
(
	[DailyChecklistID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
