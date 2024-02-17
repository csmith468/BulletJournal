namespace API.Models.DTOs {
    public class QuestionSetDto {
        public string TableName { get; set; }   // Source
        public string QuestionKey { get; set; }  // Key 
        public string QuestionLabel { get; set; } // Question
        public int QuestionOrder { get; set; }
        public string Type { get; set; }
        public string TypeDetail { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
    }
}