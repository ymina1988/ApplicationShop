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
    
    public partial class UserToRoll
    {
        public int Id { get; set; }
        public Nullable<int> IdUser { get; set; }
        public Nullable<int> IdRoll { get; set; }
    
        public virtual Rolls Rolls { get; set; }
        public virtual Users Users { get; set; }
    }
}
