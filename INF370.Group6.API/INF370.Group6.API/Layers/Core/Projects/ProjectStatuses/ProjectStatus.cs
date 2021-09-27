using System.Collections.Generic;

namespace INF370.Group6.API.Layers.Core.Projects.ProjectStatuses
{
    public class ProjectStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<Project> Projects { get; set; }

        public ProjectStatus()
        {
            Projects = new List<Project>();
        }
    }
}