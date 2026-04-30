import React from 'react';
import { Helmet } from 'react-helmet-async';
import IssueSelector from './IssueSelector';
import SelectHero from './SelectHero';

import SetupGuide from './SetupGuide';

import FooterSetup from './FooterSetup';


const SetupSelect = () => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Complete 123.hp.com/setup Steps | HP Printer Setup, Offline Fix & Troubleshooting</title>
        <meta name="description" content="Visit 123.hp.com/setup for HP printer setup help, fix HP printer offline issues, and troubleshoot HP printer errors with step-by-step guidance. Get help from HP certified technician." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://smarteprintsolution.com/printer-setup-guide/" />
        <link rel="preload" as="image" href="/hero_background_image.webp" fetchPriority="high" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Smart ePrint Solution" />
        <meta property="og:title" content="123.hp.com/setup | HP Printer Setup, Offline Fix & Troubleshooting" />
        <meta property="og:description" content="Complete HP printer setup, fix HP printer offline problems, and troubleshoot HP printer issues with easy guided steps." />
        <meta property="og:url" content="https://smarteprintsolution.com/printer-setup-guide/" />
        <meta property="og:image" content="https://smarteprintsolution.com/images/hp-printer-setup-guide.jpg" />
        <meta property="og:image:alt" content="HP printer setup and troubleshooting guide" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="123.hp.com/setup | HP Printer Setup & Offline Fix" />
        <meta name="twitter:description" content="Set up your HP printer, fix offline issues, and troubleshoot common printer errors with guided steps." />
        <meta name="twitter:image" content="https://smarteprintsolution.com/images/hp-printer-setup-guide.jpg" />
        <meta name="twitter:image:alt" content="HP printer setup and offline fix guide" />
        {/* Optional but useful */}
        <meta name="author" content="Smart ePrint Solution" />
        {/* WebPage Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "123.hp.com/setup | HP Printer Setup, Offline Fix & Troubleshooting",
            "url": "https://smarteprintsolution.com/printer-setup-guide/",
            "description": "Step-by-step guidance for HP printer setup, fixing HP printer offline problems, and troubleshooting HP printer issues.",
            "inLanguage": "en"
          }
        `}</script>
        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://smarteprintsolution.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "HP Printer Support",
                "item": "https://smarteprintsolution.com/printer-setup-guide/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "123.hp.com/setup | HP Printer Setup, Offline Fix & Troubleshooting",
                "item": "https://smarteprintsolution.com/printer-setup-guide/"
              }
            ]
          }
        `}</script>
        {/* FAQ Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I complete HP printer setup using 123.hp.com/setup?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Open 123.hp.com/setup, select your printer model, download the recommended software, and follow the installation steps to complete HP printer setup."
                }
              },
              {
                "@type": "Question",
                "name": "How can I fix HP printer offline problems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To fix HP printer offline issues, check Wi-Fi or USB connectivity, restart the printer and computer, clear the print queue, and confirm the printer is set as the default device."
                }
              },
              {
                "@type": "Question",
                "name": "How do I troubleshoot HP printer errors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To troubleshoot HP printer issues, update drivers, inspect ink or toner status, run built-in diagnostics, and reconnect the printer to your network or computer."
                }
              }
            ]
          }
        `}</script>
        {/* HowTo Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "HP Printer Setup and Troubleshooting Guide",
            "description": "Learn how to complete HP printer setup, fix HP printer offline problems, and troubleshoot HP printer errors.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Open 123.hp.com/setup",
                "text": "Visit 123.hp.com/setup in your browser to begin the installation process."
              },
              {
                "@type": "HowToStep",
                "name": "Download hp printer software",
                "text": "Choose your HP printer model and download the recommended driver and setup software."
              },
              {
                "@type": "HowToStep",
                "name": "Connect the hp printer",
                "text": "Connect your HP printer using Wi-Fi, USB, or the wireless setup wizard."
              },
              {
                "@type": "HowToStep",
                "name": "Complete hp setup and test print",
                "text": "Finish installation, add the hp printer to your device, and print a test page."
              },
              {
                "@type": "HowToStep",
                "name": "Fix hp offline or printing issues",
                "text": "If the hp printer appears offline, restart devices, check connectivity, and update the printer driver."
              }
            ]
          }
        `}</script>
      </Helmet>
      <SelectHero />
      <IssueSelector />

      <SetupGuide />

      <FooterSetup />
    </>
  );
};

export default SetupSelect;
