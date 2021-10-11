using System.Collections.Generic;
using INF370.Group6.API.Layers.Core.Phases;

namespace INF370.Group6.API.Layers.Core.Tasks
{
    public class TaskStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<Task> Tasks { get; set; }

        public TaskStatus()
        {
            Tasks = new List<Task>();
        }
    }
}