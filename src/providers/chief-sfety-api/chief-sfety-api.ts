import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChiefSfetyApiProvider {

  constructor(public http: HttpClient) {
  }

  // authentication
  authenticationLogin(userEmail,userPassword){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users/app/login`,{userEmail : userEmail , userPassword: userPassword})
  }
  authenticationSignup(userEmail,userPassword,userName,userDepartment,userCompany,nameToReceiveReport,emailToReceiveReport,companyLogo,headers){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users`,{userEmail :userEmail, userPassword:userPassword,userName :userName,userDepartment:userDepartment,userCompany:userCompany,nameToReceiveReport:nameToReceiveReport,emailToReceiveReport:emailToReceiveReport,companyLogo:companyLogo},{headers:headers})
  }
  // user previous inspections
  userPreviousInspections(userid,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/user/${userid}/inspection`,{headers : headers})
  }
  userSpecificPreviousInspections(userid,inspectionId,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/user/${userid}/inspection/${inspectionId}`,{ headers : headers })
  }
  userPreviousInspectionsDelete(inspectionId, headers){
    return this.http.delete(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/inspection/${inspectionId}`,{headers : headers})
  }
  // user profile settings
  getUserProfileData(userId,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users/${userId}`,{headers : headers})
  }
  updatingUserProfileData(userId,userEmail,userName,userDepartment,userCompany,nameToReceiveReport,emailToReceiveReport,companyLogo,profilePicture,headers){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users/${userId}`,{userEmail:userEmail,userName:userName,userDepartment:userDepartment,userCompany,nameToReceiveReport,emailToReceiveReport,companyLogo,profilePicture},{headers : headers})
  }
  // user reset password
  userResetPassword(userEmail ,newPassword){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/users/app/code-change-password`,{userEmail : userEmail , newPassword :newPassword})
  }
  // Specific user categories
  getSpecificUserCategory(userid,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/equipment-categories/user/${userid}/category`,{headers : headers})
  }
  delSpecificUserCayegory(userid,value,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/equipment-categories/user/${userid}/category/${value}`,{headers : headers})
  }
  // Specific user Sub Categories
  editSubCatregories(catId,subCatId,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/category/${catId}/remarks?sub_category_id=${subCatId}`,{headers : headers})
  }
  getEquipSubCategories(categoriesId,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/equipment-sub-categories/category/${categoriesId}/subcategory`,{headers : headers})
  }
  delEqipmentSubCategories(categoriesId,value,headers){
    return this.http.delete(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/equipment-sub-categories/category/${categoriesId}/subcategory/${value}`,{headers:headers})
  }
  // data questions
  getCategoriesQuestions(catId,subCatId,headers){
    return this.http.get(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/category/${catId}/remarks?sub_category_id=${subCatId}`,{headers: headers})
  }
  // submit inspections
  userSubmitInspection(userId,catId,equipmentInspectedImageUrl,inspectionDescription,subCategory,answers,headers){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/user/${userId}/category/${catId}/inspection`,{equipmentInspectedImageUrl:equipmentInspectedImageUrl,inspectionDescription:inspectionDescription,subCategory:subCategory,answers:answers},{headers : headers})
  }
  // submit report
  userSubmitReport(inspectionId,reportType,observationDescription,signatureUrl,mediaUrl,headers){
    return this.http.post(`http://clients2.5stardesigners.net/safetyapp/api/web/v1/user-inspections/inspection/${inspectionId}/report`,{reportType:reportType,observationDescription:observationDescription,signatureUrl:signatureUrl,mediaUrl:mediaUrl},{headers:headers})
  }







}
