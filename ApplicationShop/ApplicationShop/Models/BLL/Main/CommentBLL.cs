using ApplicationShop.Models.DataBase;
using ApplicationShop.Models.ViewModel.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Utilities.DateTime;

namespace ApplicationShop.Models.BLL.Main
{
    public class CommentBLL
    {
        public int InsertComment(CommentViewModel model)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {

                var Comments = new Comments
                {
                  IdApp = model.id,
                  Email = model.email,
                  FullName = model.name,
                  CommentText = model.message,
                  CreateDateTime = DateTime.Now,
                  IsActive = true
                };

                _Db.Comments.Add(Comments);
                if (_Db.SaveChanges() > 0)
                {
                    return Comments.Id;
                }
                else
                {
                    return 0;
                }
            }
        }

        public List<CommentViewModel> GetComment(int id)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {

                var result = _Db.Comments.Where(v=>v.IdApp == id).Select(v => new CommentViewModel()
                {
                  id = v.Id,
                  email = v.Email,
                  name = v.FullName,
                  message = v.CommentText
                }).ToList();

                return result;
            }
        }
    }
}