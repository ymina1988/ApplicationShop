﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ApplicationShopEntities : DbContext
    {
        public ApplicationShopEntities()
            : base("name=ApplicationShopEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<BookMarks> BookMarks { get; set; }
        public virtual DbSet<Downloads> Downloads { get; set; }
        public virtual DbSet<Groups> Groups { get; set; }
        public virtual DbSet<Rolls> Rolls { get; set; }
        public virtual DbSet<UserToRoll> UserToRoll { get; set; }
        public virtual DbSet<Applications> Applications { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
    }
}
