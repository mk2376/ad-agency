import Card from '@components/Card';

export const metadata = {
    title: 'Ad - WEB3 ADVERTISING AGENCY',
}

export default function Ad({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <p className="mt-3 text-2xl text-gray-500">
            Advertisement #{params.id}
        </p>
        
        <h1 className="text-6xl font-bold text-gray-950">
            Track the status of your advertisement
        </h1>

        <p className="mt-9 mb-24 text-2xl text-gray-800">
            Check how your advertisement is progressing
        </p>

        <div className="grid grid-cols-3 gap-4">
            <Card status={true} title='1. Advertisement submitted' description='Advertisement has been submited successfully and is stored on the blockchain along with InterPanetary Fie System.'></Card>
            <Card status={true} title='2 .AI model picked' description='AI model that will perform the advertisement classification has been picked.'></Card>
            <Card status={true} title='3. AI model performs the classification' description='Classification by the previously picked AI model has been performed.'></Card>
            <Card status={false} title='4. Advertisement is accepted' description='Congratulations Your advertisement has been approved.'></Card>
            <Card status={false} title='5. List of relevant websites' description='Websites that have the relevant target audience have been found.'></Card>
            <Card status={false} title='6. Advertisement is displayed on the website' description='Your advertisement is visile on the website. Check it out here.'></Card>
        </div>
      </main>
    </div>
  );
}
