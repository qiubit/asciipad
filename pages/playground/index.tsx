import type { NextPage } from 'next'

import Link from 'next/link'

const Playground: NextPage = () => {
  return (
    <div>
      <div>
        <Link href="playground/file-upload">file-upload</Link>
      </div>
      <div>
        <Link href="playground/canvas">canvas</Link>
      </div>
      <div>
        <Link href="playground/textvid">textvid</Link>
      </div>
    </div>
  );
}

export default Playground;