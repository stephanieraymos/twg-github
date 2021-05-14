import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        flexWrap: "wrap"
    },
    bolSection: {
        padding: 10,
        width: "100%",
        color: "#000",
        textAlign: "center",
        fontSize: 40,
    },
    facilitySection: {
        padding: 10,
        width: "50%",
        color: "#000",
        textAlign: "center",
        fontSize: 24
    },
    laneSection: {
        padding: 10,
        width: "50%",
        color: "#000",
        textAlign: "center",
        fontSize: 24
    },
    palletIdSection: {
        padding: 10,
        width: "100%",
        color: "#000",
        textAlign: "center",
        fontSize: 40
    }
});

// label: bol #, facility, Pallet id and barcode, lane

const PDFLabel = (props) => {

    const { palletId, barcode } = props

    const bolNumber = "815505056";
    const facility = "T-01";
    const lane = "F6";
    
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.bolSection}>
                    <Text>BOL #{bolNumber}</Text>
                </View>
                <View style={styles.facilitySection}>
                    <Text>Facility: {facility}</Text>
                </View>
                <View style={styles.laneSection}>
                    <Text>Lane: {lane}</Text>
                </View>
                <View style={styles.palletIdSection}>
                    <Text>Pallet ID</Text>
                    <Image source={ {uri: barcode} }></Image>
                    <Text>{palletId}</Text>
                </View>
            </Page>
        </Document>
    )
};

export default PDFLabel;