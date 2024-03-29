//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ApplicationShop.Models.DataBase
{
    using System;
    using System.Collections.Generic;
    
    public partial class Applications
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Applications()
        {
            this.BookMarks = new HashSet<BookMarks>();
            this.Downloads = new HashSet<Downloads>();
            this.Comments = new HashSet<Comments>();
        }
    
        public int Id { get; set; }
        public int IdUser { get; set; }
        public Nullable<int> IdGroup { get; set; }
        public string AppName { get; set; }
        public Nullable<int> Size { get; set; }
        public string Version { get; set; }
        public string AppURL { get; set; }
        public string ImgURL { get; set; }
        public string Description { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        public virtual Groups Groups { get; set; }
        public virtual Users Users { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BookMarks> BookMarks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Downloads> Downloads { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Comments> Comments { get; set; }
    }
}
