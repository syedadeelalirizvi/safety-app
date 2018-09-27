import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChiefSfetyApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChiefSfetyApiProvider {

  constructor(public http: HttpClient) {
  }

  authenticationLogin(userEmail,userPassword){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users/app/login`,{userEmail : userEmail , userPassword: userPassword})
  }
  authenticationSignup(userEmail,userPassword,userName,userDepartment,userCompany,nameToReceiveReport,emailToReceiveReport,companyLogo,headers){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users`,{userEmail :userEmail, userPassword:userPassword,userName :userName,userDepartment:userDepartment,userCompany:userCompany,nameToReceiveReport:nameToReceiveReport,emailToReceiveReport:emailToReceiveReport,companyLogo:companyLogo},{headers:headers})
  }
  userPreviousInspections(userid,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/user/${userid}/inspection`,{headers : headers})
  }
  userPreviousInspectionsDelete(inspectionId, headers){
    return this.http.delete(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/inspection/${inspectionId}`,{headers : headers})
  }
  getUserProfileData(userId,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users/${userId}`,{headers : headers})
  }
  updatingUserProfileData(userId,userEmail,userName,userDepartment,userCompany,nameToReceiveReport,emailToReceiveReport,companyLogo,profilePicture,headers){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users/${userId}`,{userEmail:userEmail,userName:userName,userDepartment:userDepartment,userCompany,nameToReceiveReport,emailToReceiveReport,companyLogo,profilePicture},{headers : headers})
  }
  getSpecificUserCategory(userid,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/equipment-categories/user/${userid}/category`,{headers : headers})
  }
  delSpecificUserCayegory(userid,value,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/equipment-categories/user/${userid}/category/${value}`,{headers : headers})
  }
  editSubCatregories(catId,subCatId,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/category/${catId}/remarks?sub_category_id=${subCatId}`,{headers : headers})
  }



}
