package main

import (
	"encoding/json"
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPemToJWKS(t *testing.T) {
	bs, err := ioutil.ReadFile("../../data/tpp_cert.pem")
	require.NoError(t, err)
	require.NotNil(t, bs)

	cert, err := ParseCertificate(bs)
	require.NoError(t, err)

	key, err := ToPublicJWKs(cert)
	require.NoError(t, err)

	jsonBs, err := json.Marshal(&key)
	require.NoError(t, err)

	require.JSONEq(t, `{
            "use": "sig",
            "kty": "RSA",
            "kid": "167467200346518873990055631921812347975180003245",
            "alg": "RS256",
            "n": "4b_IX1bV29pw6_Ce8DdkoNx4dxJnDD9AyxmTG2z99cvlHG6BJaMF6l09ncGXGbv3dufDKrhftkwfbTBdpUEAeext_ugCmXTV06Fayva6Iq7xCNE8pA6hJT1y3Edsqq3IU8KVivYjYwd_vrSUfCe8pQRsR6K8rqnJ66ryn0yewkTEyCgPIv6pOMbgq1d5iX_2G9rZNhj74miN5y4fy0tsbI3q2RUOzt2d-htkoysqu3Xta6qPA3vEJ2FnQo3dhgw4XSCEvjz-HSGnsTC-XBv6j6jI9SD5jI2UYqnyDcYmRHPJx2sQ_c8aLYHRdZxrxqIxUzulS6g0x74E2m0gBMKF5w",
            "e": "AQAB"
}`, string(jsonBs))
}
