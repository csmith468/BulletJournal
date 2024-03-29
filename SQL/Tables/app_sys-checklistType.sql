SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [app_sys].[checklistType](
	[checklistTypeID] [int] IDENTITY(1,1) NOT NULL,
	[key] [nvarchar](100) NOT NULL,
	[label] [nvarchar](100) NOT NULL,
	[icon] [nvarchar](100) NOT NULL,
	[category] [nvarchar](100) NULL,
	[isHeader] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [app_sys].[checklistType] ADD PRIMARY KEY CLUSTERED 
(
	[checklistTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
