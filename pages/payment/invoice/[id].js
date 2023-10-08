import React, { useState, useEffect } from 'react'
import { Document, Page, PDFViewer, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import axios from 'axios';
import RenterFormStyles from './renter-form-styles';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import StandardDateFormat from '@/helpers/StandardDateFormat';
import GenerateRandomString from "@/helpers/GenerateRandomString";



const styles = StyleSheet.create(RenterFormStyles[0]);


const RenterFormPdf = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();

  const payment_id = router?.query?.id;


  useEffect(() => {

    axios.post(`/api/payment/get-payment`,{id:payment_id}).then(res => {
      if(res?.data?.user){
        setUser(res.data.user);
      }
      if(res?.data?.admin){
        setAdmin(res.data.admin);
      }
      setLoading(false)

    }).catch(err => {
      console.log(err,'==========error==========')
    });
  }, [])

 

  if (loading) {
    return <h1 className='content-page'>Loading...</h1>
  }

  return (
    <PDFViewer width="100%" height={window.innerHeight + "px"}>
      <Document size="A4" width="80%">
        <Page style={styles.page} orientation="portrait">
          <View style={styles.pageHeader}>
            <View style={styles.leftPageHeaderContent}>
              <Text style={styles.leftPageHeaderContentTop}>Maa Babar Doa</Text>
              <Text style={styles.billContentText}>{admin?.username}</Text>
              <Text style={styles.billContentText}>Email: {admin?.email}</Text>
              <Text style={styles.billContentText}>
                Mobile: {admin?.mobile}
              </Text>
            </View>
            <View style={styles.rightPageHeaderContent}>
              <Image src="/icon-192x192.png" style={styles.rightImage} />
              <Text style={styles.rightPageHeaderText}>INVOICE</Text>
            </View>
          </View>

          <View style={styles.hrContent}></View>

          <View style={styles.billContent}>
            <View>
              <Text style={styles.billContentHeader}>Billed To:</Text>
              <Text style={styles.billContentText}>
                Name: {user?.member_id?.first_name} {user?.member_id?.last_name}
              </Text>
              <Text style={styles.billContentText}>
                Email: {user?.user_id?.email}
              </Text>
              <Text style={styles.billContentText}>
                Mobile: {user?.user_id?.mobile}
              </Text>
            </View>

            <View>
              <Text style={styles.billContentText}>
                Issue Date: {StandardDateFormat(user?.date)}
              </Text>
              <Text style={styles.billContentText}>
                Due Date: {StandardDateFormat(user?.updatedAt)}
              </Text>
              <Text style={styles.billContentText}>
                Invoice Number: {GenerateRandomString()}
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.tableContentContainer}>
              <Text style={styles.tableContentText}>Property Address</Text>
              <Text style={styles.tableContentText}>Rent</Text>
              <Text style={styles.tableContentText}>Utilities</Text>
              <Text style={styles.tableContentText}>Due</Text>
            </View>
            <View style={styles.tableContentContainer}>
              <Text style={styles.tableContentText2}></Text>
              <Text style={styles.tableContentText2}>{user?.amount}</Text>
              <Text style={styles.tableContentText2}></Text>
              <Text style={styles.tableContentText2}>{user?.amount}</Text>
            </View>
            <View style={styles.tableContentContainer}>
              <Text style={styles.tableContentText3}></Text>
              <Text style={styles.tableContentText3}></Text>
              <Text style={styles.tableContentText3}>Total</Text>
              <Text style={styles.tableContentText3}>{user?.amount}</Text>
            </View>
          </View>

          <View style={styles.paidTextContainer}>
            <Text style={styles.paidText}>Paid</Text>
          </View>

          <View style={styles.billContent}>
            <View style={styles.conditionContainer}>
              <Text style={styles.conditionHeader}>Terms & Conditions:</Text>
              <Text style={styles.conditionText}>
                01. Bills must be paid by the 5th of the month.
              </Text>
              <Text style={styles.conditionText}>
                02. must be use the payment method provided by us.
              </Text>
            </View>

            <View style={styles.signature}>
              <Text>Signature</Text>
            </View>
          </View>

          <View style={styles.queryContainer}>
            <Text style={styles.italic}>If you have any queries about this invoice, </Text>
            <Text style={styles.italic}> please contact 01999999999</Text>
            <Text style={styles.italic}> Or</Text>
            <Text style={styles.italic}> abc@gmail.com</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default RenterFormPdf