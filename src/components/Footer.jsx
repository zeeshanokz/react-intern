
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 dark:bg-black text-zinc-50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"> <div>
            <h3 className="text-xl font-bold mb-2"> ARCA<span className="text-cyan-400">.</span> </h3>
            <p className="text-zinc-400 text-sm">
              Premium mechanical keyboards and accessories for the modern enthusiast. </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-zinc-50 transition">Keyboards</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition">Keycaps</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition">Switches</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-zinc-50 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition">Returns</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8">
          <div className="text-center text-sm text-zinc-400">
            <p>&copy; {currentYear} ARCA. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
