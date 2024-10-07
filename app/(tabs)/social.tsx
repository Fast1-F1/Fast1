import { WebView } from 'react-native-webview';

export default function SocialFeed() {
  const twitterAccount = 'F1';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;">
        <a class="twitter-timeline" data-theme="dark" data-chrome="noheader nofooter noborders" href="https://twitter.com/${twitterAccount}">
          Tweets by ${twitterAccount}
        </a> 
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </body>
    </html>
  `;
  return <WebView className="flex-1" source={{ html: htmlContent }} />;
}
