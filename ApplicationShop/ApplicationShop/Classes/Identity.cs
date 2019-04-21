using ApplicationShop.Models.DataBase;
using System;
using System.Web.Security;

namespace ApplicationShop.Classes
{
    public class MyProvider : RoleProvider
    {
        private ApplicationShopEntities Model = new ApplicationShopEntities();

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string UserName)
        {
            //var UserRoleList = Model.UsersRoles.Where(x => x.User.Customer.UserName == UserName).Select(x => x.RoleID).ToArray();
            //var UserPermison = Model.RolesPermissions.Where(x => UserRoleList.Contains(x.RoleID)).Select(x => x.Permissions.PermissionName).ToArray();


            //string[] _Roles = new string[UserPermison.Length];
            //for (int i = 0; i < UserPermison.Length; i++)
            //{
            //    _Roles[i] = UserPermison[i];
            //}

            //return _Roles;
            return new string[] { "User", "AdminAllPermission" };
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}