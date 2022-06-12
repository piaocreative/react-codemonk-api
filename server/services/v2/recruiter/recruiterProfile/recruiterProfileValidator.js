const validation = require('../../../validation');
/**
 * Class represents validations for recruiter profile details.
 */
class RecruiterProfileValidator extends validation {
  constructor(body, local) {
    super(local);
    this.body = body;
  }

  /**
   * @desc This function is being used to validate recruiter profile put request
   * @author Innovify
   * @since 08/07/2020
   */
  async profile() {
    await super.firstName(this.body.firstName);
    await super.lastName(this.body.lastName);
    await super.checkJobTitle(this.body.jobTitle);
  }

  /**
   * @desc This function is being used to validate user profile picture
   * @author Innovify
   * @since 17/02/2020
   */
  async validateLogo() {
    if (typeof this.body === 'undefined') {
      throw new CodeMonkError(this.__(this.FILE_TYPE_NOT_VALID, 'File'), 400);
    }
    await super.fileType(this.body.mimetype);
    await super.fileSize(this.body.size);
    await super.fileResoultion(this.body.buffer);
  }

  /**
   * @desc This function is being used to validate recruiter companyDetails
   * @author Innovify
   * @param {object} companyDetails companyDetails
   * @since 17/02/2022
   */
  async companyDetails() {
    await this.companyLegalName(this.body.name);
    await this.companyBrand(this.body.brand);
    await super.registeredNumber(this.body.registeredNumber);
    await this.vatNumber(this.body.vatNumber);
    await super.postcode(this.body.postcode);
    await super.country(this.body.country);
    await super.addressLineOne(this.body.addressLineOne);
    await super.city(this.body.city);
    !!this.body.addressLineTwo && await super.addressLineOne(this.body.addressLineTwo);
    !!this.body.state && await super.state(this.body.state);
    await super.website(this.body.websiteUrl);
    if (!this.body.linkedInUrl) {
      throw new CodeMonkError(this.__(this.REQUIRED, 'Linkedin URL'), 400);
    }
    super.linkedInUrl(this.body.linkedInUrl);
  }
  async validateExisting() {
    !!this.body.name && await this.companyLegalName(this.body.name);
    !!this.body.brand && await this.companyBrand(this.body.brand);
    !!this.body.registeredNumber && await super.registeredNumber(this.body.registeredNumber);
    !!this.body.vatNumber && await this.vatNumber(this.body.vatNumber);
    !!this.body.postcode && await super.postcode(this.body.postcode);
    !!this.body.country && await super.country(this.body.country);
    !!this.body.addressLineOne && await super.addressLineOne(this.body.addressLineOne);
    !!this.body.addressLineTwo && await super.addressLineOne(this.body.addressLineTwo);
    !!this.body.city && await super.city(this.body.city);
    !!this.body.state && await super.state(this.body.state);
    !!this.body.websiteUrl && await super.otherWebsiteUrl(this.body.websiteUrl);
    !!this.body.linkedInUrl && await super.linkedInUrl(this.body.linkedInUrl);
  }

  /**
   * @desc This function is being used to validate company name
   * @author Innovify
   * @since 08/07/2020
   * @param {String} companyLegalName companyLegalName of user
   */
  async companyLegalName(companyLegalName) {
    if (!companyLegalName) {
      throw new CodeMonkError(this.__(this.REQUIRED, 'Company Legal Name'), 400);
    }
  }

  /**
   * @desc This function is being used to validate company brand
   * @author Innovify
   * @since 08/07/2020
   * @param {String} companyBrand 
   */
  async companyBrand(companyBrand) {
    if (!companyBrand) {
      throw new CodeMonkError(this.__(this.REQUIRED, 'Company Brand'), 400);
    }
  }

  /**
   * @desc This function is being used to validate vatNumber
   * @author Innovify
   * @since 09/07/2020
   * @param {string} vatNumber vatNumber of recruiter user company
   */
  async vatNumber(vatNumber) {
    if (!vatNumber) {
      throw new CodeMonkError(this.__(this.REQUIRED, 'VAT number'), 400);
    }
  }

}

module.exports = RecruiterProfileValidator;
