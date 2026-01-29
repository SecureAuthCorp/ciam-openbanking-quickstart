package main

import (
	"encoding/json"
	"os"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPemToJWKS(t *testing.T) {
	bs, err := os.ReadFile("../../data/tpp_cert.pem")
	require.NoError(t, err)
	require.NotNil(t, bs)

	cert, err := ParseCertificate(bs)
	require.NoError(t, err)

	key, err := ToPublicJWKs(cert)
	require.NoError(t, err)

	jsonBs, err := json.Marshal(&key)
	require.NoError(t, err)

	require.JSONEq(t, `{"keys":[{
            "use": "sig",
            "kty": "RSA",
            "kid": "572356338587782038927312347033327560343951693321",
            "alg": "RS256",
            "n": "s11Q7mwhtinAfo-HWGm_UTvXi6pNx1YkdhR8ech2L3Y0WAmb4c8C24I30nUYmafXU3xiDk4WJeZMEaOrS-Kia5Ynvv5ijddqAvwMWKuy7qwjLGupJTxNm2xUFxUjWvrcgc7d-OCyySbbFJSFcQ7pYwVzX9suzCYHE3TdZ0FR_czAHanRlHd91l7Dt_MkfKKnIGFL99YsUg13FeJ-qzH2WEoKYOLqljxcc-P-kC165oLe4nrFgTnYzd98J4Z7NYyyziX1Rbo5Tk08iEtHcwPqaIj-4iaueYUFcOpnR3ADQ7eTpBhKODuU0_Dx2gmtySsA-G-DJyAdIHPJE13J-Pb9gw",
            "e": "AQAB"
}]}`, string(jsonBs))
}
