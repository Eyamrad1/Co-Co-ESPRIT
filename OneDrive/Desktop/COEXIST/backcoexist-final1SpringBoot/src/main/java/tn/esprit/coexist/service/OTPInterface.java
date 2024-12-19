package tn.esprit.coexist.service;

import tn.esprit.coexist.dto.OTP;

public interface OTPInterface {
    OTP GenerateOTp( );
    Boolean VerifierOTP ( String identification )  ;

    OTP ResendOTP(OTP existingOTP);
    void  DeleteOTP();
}
